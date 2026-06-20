import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import Button from "./ui/Button";
import type {
  CheckoutFormData,
  CheckoutFormErrors,
  InvoiceCartItem,
} from "../types/checkout";
import { generateInvoicePdf } from "../utils/generateInvoicePdf";
import { SHIPPING_COST } from "../utils/vat";

type CheckoutFormProps = {
  items: InvoiceCartItem[];
  onBack: () => void;
  onSuccess: () => void;
};

const inputClassName =
  "field-accent placeholder-muted min-h-12 w-full border px-4 py-3 transition";

const labelClassName =
  "text-secondary mb-2 block text-sm uppercase tracking-[0.14em]";

const createInitialFormData = (): CheckoutFormData => ({
  firstName: "",
  lastName: "",
  country: "Polska",
  street: "",
  postalCode: "",
  city: "",
  phone: "",
  email: "",
  taxId: "",
  orderNotes: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalCodeRegex = /^\d{2}-\d{3}$/;

const validateCheckoutForm = (
  formData: CheckoutFormData,
): CheckoutFormErrors => {
  const errors: CheckoutFormErrors = {};
  const sanitizedPhone = formData.phone.replace(/\D/g, "");

  if (!formData.firstName.trim()) {
    errors.firstName = "Uzupełnij imię";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Uzupełnij nazwisko";
  }

  if (!formData.country.trim()) {
    errors.country = "Uzupełnij kraj lub region";
  }

  if (!formData.street.trim()) {
    errors.street = "Uzupełnij ulicę";
  }

  if (!postalCodeRegex.test(formData.postalCode.trim())) {
    errors.postalCode = "Kod pocztowy powinien mieć format 00-000";
  }

  if (!formData.city.trim()) {
    errors.city = "Uzupełnij miasto";
  }

  if (sanitizedPhone.length < 9 || sanitizedPhone.length > 15) {
    errors.phone = "Uzupełnij numer telefonu";
  }

  if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Podaj poprawny adres e-mail";
  }

  return errors;
};

const CheckoutForm = ({ items, onBack, onSuccess }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>(
    createInitialFormData,
  );
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );
  const delivery = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + delivery;

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleDownloadInvoice = async () => {
    const nextErrors = validateCheckoutForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await generateInvoicePdf(formData, items);
    onSuccess();
  };

  const renderField = (
    field: keyof CheckoutFormData,
    label: string,
    isRequired: boolean,
    options?: {
      placeholder?: string;
      type?: "text" | "email" | "tel";
      textarea?: boolean;
    },
  ) => {
    const error = errors[field];
    const commonProps = {
      className: `${inputClassName} ${error ? "field-error" : ""}`.trim(),
      value: formData[field],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        updateField(field, event.target.value),
      placeholder: options?.placeholder,
    };

    return (
      <label className="block">
        <span className={labelClassName}>
          {label} {isRequired ? <span className="text-[#ff4d6d]">*</span> : null}
        </span>
        {options?.textarea ? (
          <textarea
            {...commonProps}
            rows={4}
            className={`${commonProps.className} resize-y`}
          />
        ) : (
          <input {...commonProps} type={options?.type ?? "text"} />
        )}
        {error ? (
          <span className="mt-2 block text-sm text-[#ff6b6b]">{error}</span>
        ) : null}
      </label>
    );
  };

  return (
    <div className="grid gap-8">
      <div className="border-accent-faint flex items-start justify-between gap-4 border-b pb-5 max-[640px]:flex-col">
        <div>
          <p className="text-accent-soft font-mono text-3xl">
            // Rozliczenia i wysyłka
          </p>
          <p className="text-muted mt-2 text-sm">
            Uzupełnij dane klienta, aby wygenerować demonstracyjną fakturę PDF.
          </p>
        </div>
        <Button variant="ghost" className="min-h-12 px-5 py-3" onClick={onBack}>
          Wróć do koszyka
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border-accent-faint grid gap-5 border bg-black/20 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {renderField("firstName", "Imię", true)}
            {renderField("lastName", "Nazwisko", true)}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {renderField("country", "Kraj / region", true)}
            {renderField("postalCode", "Kod pocztowy", true, {
              placeholder: "00-000",
            })}
          </div>

          {renderField("street", "Ulica", true, {
            placeholder: "Nazwa ulicy, numer budynku / numer lokalu",
          })}

          <div className="grid gap-5 md:grid-cols-2">
            {renderField("city", "Miasto", true)}
            {renderField("phone", "Numer telefonu", true, { type: "tel" })}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {renderField("email", "Adres e-mail", true, { type: "email" })}
            {renderField("taxId", "NIP", false)}
          </div>

          {renderField("orderNotes", "Uwagi do zamówienia", false, {
            textarea: true,
          })}
        </div>

        <aside className="border-accent-faint h-fit border bg-[linear-gradient(180deg,rgba(8,17,27,0.96),rgba(3,8,14,0.92))] p-5 sm:p-6">
          <p className="text-accent-soft font-mono text-lg">// Podsumowanie</p>
          <div className="text-secondary mt-5 grid gap-4 text-sm">
            {items.map((item) => (
              <div
                className="border-accent-hairline border bg-white/[0.02] p-3"
                key={`${item.product.name}-${item.size}`}
              >
                <p className="text-main font-semibold">{item.product.name}</p>
                <p className="text-muted mt-1 text-xs uppercase tracking-[0.14em]">
                  Rozmiar {item.size} · Ilość {item.quantity}
                </p>
                <p className="text-accent-soft mt-2">
                  {(item.product.price * item.quantity).toFixed(2)} PLN
                </p>
              </div>
            ))}
          </div>

          <div className="text-secondary border-accent-subtle mt-6 grid gap-3 border-t pt-5 text-sm">
            <p className="flex justify-between gap-4">
              <span>Suma częściowa</span>
              <span>{subtotal.toFixed(2)} PLN</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Dostawa</span>
              <span>{delivery.toFixed(2)} PLN</span>
            </p>
            <p className="text-accent-soft flex justify-between gap-4 text-lg font-bold">
              <span>Razem do zapłaty</span>
              <span>{total.toFixed(2)} PLN</span>
            </p>
          </div>

          <Button
            className="mt-6 min-h-14 w-full"
            onClick={handleDownloadInvoice}
            disabled={items.length === 0}
          >
            Pobierz fakturę PDF
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutForm;
