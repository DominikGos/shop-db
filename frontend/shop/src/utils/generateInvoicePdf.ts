import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CheckoutFormData, InvoiceCartItem } from "../types/checkout";
import {
  SHIPPING_COST,
  getNetFromGross,
  getVatFromGross,
  roundCurrency,
} from "./vat";

const sellerDetails = [
  "PoliWear",
  "ul. Programistyczna 1",
  "25-000 Kielce",
  "NIP: 1234567890",
  "E-mail: kontakt@poliwear.pl",
];

const formatCurrency = (value: number) => `${roundCurrency(value).toFixed(2)} PLN`;

const generateInvoiceNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const sequence = `${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  return `FV/${year}/${sequence}`;
};

const getBuyerLines = (formData: CheckoutFormData) => {
  const lines = [
    `${formData.firstName} ${formData.lastName}`.trim(),
    formData.street,
    `${formData.postalCode} ${formData.city}`.trim(),
    formData.country,
    `E-mail: ${formData.email}`,
    `Telefon: ${formData.phone}`,
  ];

  if (formData.taxId.trim()) {
    lines.push(`NIP: ${formData.taxId.trim()}`);
  }

  if (formData.orderNotes.trim()) {
    lines.push(`Uwagi: ${formData.orderNotes.trim()}`);
  }

  return lines;
};

const loadImageAsDataUrl = (imageUrl?: string) =>
  new Promise<string | null>((resolve) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");

        if (!context) {
          resolve(null);
          return;
        }

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, size, size);

        const scale = Math.min(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        const offsetX = (size - width) / 2;
        const offsetY = (size - height) / 2;

        context.drawImage(image, offsetX, offsetY, width, height);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };

    image.onerror = () => resolve(null);
    image.src = imageUrl;
  });

type InvoiceRow = InvoiceCartItem & {
  grossUnit: number;
  netUnit: number;
  vatUnit: number;
  grossTotal: number;
};

type InvoiceTotals = {
  productNet: number;
  productVat: number;
  deliveryGross: number;
  deliveryNet: number;
  deliveryVat: number;
  totalGross: number;
};

const buildInvoiceRows = (items: InvoiceCartItem[]): InvoiceRow[] =>
  items.map((item) => {
    const grossUnit = roundCurrency(item.product.price);
    const netUnit = getNetFromGross(grossUnit);
    const vatUnit = getVatFromGross(grossUnit);
    const grossTotal = roundCurrency(grossUnit * item.quantity);

    return {
      ...item,
      grossUnit,
      netUnit,
      vatUnit,
      grossTotal,
    };
  });

const calculateInvoiceTotals = (
  invoiceRows: InvoiceRow[],
  hasItems: boolean,
): InvoiceTotals => {
  const productGross = roundCurrency(
    invoiceRows.reduce((total, item) => total + item.grossTotal, 0),
  );
  const productNet = roundCurrency(
    invoiceRows.reduce((total, item) => total + item.netUnit * item.quantity, 0),
  );
  const productVat = roundCurrency(productGross - productNet);

  const deliveryGross = hasItems ? SHIPPING_COST : 0;
  const deliveryNet = getNetFromGross(deliveryGross);
  const deliveryVat = getVatFromGross(deliveryGross);
  const totalGross = roundCurrency(productGross + deliveryGross);

  return {
    productNet,
    productVat,
    deliveryGross,
    deliveryNet,
    deliveryVat,
    totalGross,
  };
};

const drawInvoiceHeader = (
  doc: jsPDF,
  pageWidth: number,
  invoiceNumber: string,
  issueDate: string,
) => {
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 28, "F");
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 28, pageWidth, 2.5, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.text("Faktura elektroniczna", 14, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Numer faktury: ${invoiceNumber}`, 14, 21);
  doc.text(`Data wystawienia: ${issueDate}`, 14, 26);
};

const drawSellerAndBuyerSection = (doc: jsPDF, formData: CheckoutFormData) => {
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(209, 213, 219);
  doc.roundedRect(14, 38, 84, 42, 2, 2, "FD");
  doc.roundedRect(112, 38, 84, 50, 2, 2, "FD");

  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Sprzedawca", 18, 47);
  doc.text("Nabywca", 116, 47);
  doc.setDrawColor(34, 197, 94);
  doc.line(18, 50, 48, 50);
  doc.line(116, 50, 144, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.8);
  doc.setTextColor(31, 41, 55);
  doc.text(sellerDetails, 18, 57, { lineHeightFactor: 1.45 });
  doc.text(getBuyerLines(formData), 116, 57, { lineHeightFactor: 1.45 });
};

const drawProductsTable = (
  doc: jsPDF,
  invoiceRows: InvoiceRow[],
  thumbnails: Array<string | null>,
) => {
  autoTable(doc, {
    startY: 98,
    theme: "grid",
    head: [
      [
        "Lp.",
        "Foto",
        "Produkt",
        "Rozm.",
        "Ilosc",
        "Netto",
        "VAT",
        "Cena br.",
        "Wartosc",
      ],
    ],
    body: invoiceRows.map((item, index) => [
      `${index + 1}`,
      thumbnails[index] ? "" : "Brak",
      item.product.name,
      item.size,
      `${item.quantity}`,
      formatCurrency(item.netUnit),
      formatCurrency(item.vatUnit),
      formatCurrency(item.grossUnit),
      formatCurrency(item.grossTotal),
    ]),
    margin: { left: 14, right: 14 },
    styles: {
      font: "helvetica",
      fontSize: 7.8,
      textColor: [31, 41, 55],
      lineColor: [209, 213, 219],
      lineWidth: 0.15,
      cellPadding: 1.8,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: [17, 24, 39],
      fontStyle: "bold",
      fontSize: 7.5,
      lineColor: [34, 197, 94],
      lineWidth: 0.35,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 15, halign: "center" },
      2: { cellWidth: 45 },
      3: { cellWidth: 14, halign: "center" },
      4: { cellWidth: 10, halign: "center" },
      5: { cellWidth: 20, halign: "right" },
      6: { cellWidth: 18, halign: "right" },
      7: { cellWidth: 22, halign: "right" },
      8: { cellWidth: 30, halign: "right" },
    },
    didParseCell: (hookData) => {
      if (hookData.section === "body" && hookData.column.index === 1) {
        hookData.cell.styles.minCellHeight = 16;
      }
    },
    didDrawCell: (hookData) => {
      if (hookData.section !== "body" || hookData.column.index !== 1) {
        return;
      }

      const imageData = thumbnails[hookData.row.index];

      if (!imageData) {
        return;
      }

      const imageSize = 12;
      const x = hookData.cell.x + (hookData.cell.width - imageSize) / 2;
      const y = hookData.cell.y + (hookData.cell.height - imageSize) / 2;

      try {
        doc.addImage(imageData, "PNG", x, y, imageSize, imageSize);
      } catch {
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(7.5);
        doc.text("Brak", hookData.cell.x + hookData.cell.width / 2, hookData.cell.y + 9, {
          align: "center",
        });
        doc.setTextColor(31, 41, 55);
      }
    },
  });

  return (
    (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ??
    140
  );
};

const drawSummaryAndFooter = (
  doc: jsPDF,
  pageHeight: number,
  tableEndY: number,
  totals: InvoiceTotals,
) => {
  const summaryHeight = 52;
  const footerHeight = 16;
  const needsNewPage = tableEndY + 10 + summaryHeight + footerHeight > pageHeight - 14;

  if (needsNewPage) {
    doc.addPage();
  }

  const summaryTop = needsNewPage ? 20 : tableEndY + 10;
  const footerTop = summaryTop + summaryHeight + 10;

  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(209, 213, 219);
  doc.roundedRect(104, summaryTop, 92, summaryHeight, 2, 2, "FD");

  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Podsumowanie", 108, summaryTop + 8);
  doc.setDrawColor(34, 197, 94);
  doc.line(108, summaryTop + 11, 138, summaryTop + 11);

  const summaryRows = [
    ["Suma netto", formatCurrency(totals.productNet)],
    ["VAT 23%", formatCurrency(totals.productVat)],
    ["Dostawa netto", formatCurrency(totals.deliveryNet)],
    ["VAT od dostawy", formatCurrency(totals.deliveryVat)],
    ["Dostawa brutto", formatCurrency(totals.deliveryGross)],
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.3);
  doc.setTextColor(55, 65, 81);
  summaryRows.forEach(([label, value], index) => {
    const rowY = summaryTop + 18 + index * 6;
    doc.text(label, 108, rowY);
    doc.text(value, 192, rowY, { align: "right" });
  });

  doc.setDrawColor(203, 213, 225);
  doc.line(108, summaryTop + 43, 192, summaryTop + 43);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text("Razem brutto", 108, summaryTop + 49);
  doc.text(formatCurrency(totals.totalGross), 192, summaryTop + 49, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.3);
  doc.setTextColor(107, 114, 128);
  doc.text(
    [
      "Dokument wygenerowany automatycznie w aplikacji PoliWear.",
      "Faktura ma charakter demonstracyjny i zostala przygotowana na potrzeby projektu.",
    ],
    14,
    footerTop,
    { lineHeightFactor: 1.35 },
  );
};

export const generateInvoicePdf = async (
  formData: CheckoutFormData,
  items: InvoiceCartItem[],
) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const invoiceNumber = generateInvoiceNumber();
  const issueDate = new Date().toLocaleDateString("pl-PL");
  const invoiceRows = buildInvoiceRows(items);
  const totals = calculateInvoiceTotals(invoiceRows, items.length > 0);
  const thumbnails = await Promise.all(
    invoiceRows.map((item) => loadImageAsDataUrl(item.product.imageUrl)),
  );

  drawInvoiceHeader(doc, pageWidth, invoiceNumber, issueDate);
  drawSellerAndBuyerSection(doc, formData);
  const tableEndY = drawProductsTable(doc, invoiceRows, thumbnails);
  drawSummaryAndFooter(doc, pageHeight, tableEndY, totals);

  doc.save(`${invoiceNumber.replaceAll("/", "-")}.pdf`);
};
