import { useState, type FormEvent } from "react";
import type { ProductInput } from "../../types/product";

type AddProductModalProps = {
  onClose: () => void;
  onAddProduct: (product: ProductInput) => Promise<void>;
};

const AddProductModal = ({ onClose, onAddProduct }: AddProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const clearForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setImageFile(null);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !price || !quantity) {
      setError("Uzupełnij wszystkie wymagane pola.");
      return;
    }

    const priceValue = Number(price);
    const quantityValue = Number(quantity);

    if (priceValue <= 0 || quantityValue < 0) {
      setError("Cena musi być większa od 0, a ilość nie może być ujemna.");
      return;
    }

    const newProduct: ProductInput = {
      name: name.trim(),
      price: priceValue,
      quantity: quantityValue,
      imageFile,
    };

    try {
      await onAddProduct(newProduct);
      clearForm();
      onClose();
    } catch (error) {
      console.error(error);
      setError("Nie udało się dodać produktu.");
    }
  };

  const handleCancel = () => {
    clearForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="panel-accent-soft relative max-h-[90vh] w-[900px] max-w-full overflow-y-auto p-12 max-[700px]:px-5 max-[700px]:pb-6 max-[700px]:pt-9">
        <button
          className="hover-text-accent text-muted absolute right-6 top-5 border-0 bg-transparent text-3xl"
          type="button"
          onClick={handleCancel}
          aria-label="Zamknij formularz"
        >
          x
        </button>

        <p className="text-accent-soft text-3xl">// Dodaj nowy produkt</p>
        <h2 className="text-muted mt-2 text-lg">Wprowadź dane produktu</h2>

        <form className="mt-9 flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="text-main flex flex-col gap-2.5 font-bold">
            <span>Nazwa produktu</span>
            <input
              className="field-accent placeholder-main min-h-16 w-full border-2 px-5 py-4"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="np. Hello World Tee"
            />
            <small className="text-muted font-normal">// pole wymagane</small>
          </label>

          <label className="text-main flex flex-col gap-2.5 font-bold">
            <span>Cena</span>
            <div className="field-accent flex items-center border-2">
              <input
                className="text-main placeholder-main min-h-16 w-full border-0 bg-transparent px-5 py-4 outline-none"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="99.99"
              />
              <strong className="text-muted pr-5">PLN</strong>
            </div>
            <small className="text-muted font-normal">// pole wymagane</small>
          </label>

          <label className="text-main flex flex-col gap-2.5 font-bold">
            <span>Ilość</span>
            <input
              className="field-accent placeholder-main min-h-16 w-full border-2 px-5 py-4"
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="12"
            />
            <small className="text-muted font-normal">// pole wymagane</small>
          </label>

          <label className="text-main flex flex-col gap-2.5 font-bold">
            <span>Plik zdjęciowy</span>
            <span className="field-accent flex min-h-16 w-full cursor-pointer items-center border-2 px-5 py-4 transition hover:border-[var(--color-accent)]">
              Wybierz zdjęcie
            </span>
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImageFile(event.target.files ? event.target.files[0] : null)
              }
            />
            {imageFile ? (
              <small className="text-muted font-normal">
                // wybrano: {imageFile.name}
              </small>
            ) : null}
          </label>

          {error ? (
            <p className="text-main border-l-[3px] border-accent bg-[rgba(0,255,42,0.1)] px-4 py-3.5">
              {error}
            </p>
          ) : null}

          <div className="mt-3 flex gap-4 max-[700px]:flex-col">
            <button
              className="btn-accent-subtle min-h-16 w-1/2 border-2 bg-transparent max-[700px]:w-full"
              type="submit"
            >
              Dodaj produkt
            </button>
            <button
              className="btn-muted min-h-16 w-1/2 border-2 max-[700px]:w-full"
              type="button"
              onClick={handleCancel}
            >
              Zamknij
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
