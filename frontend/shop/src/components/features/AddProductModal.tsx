import { useState, type FormEvent } from "react";
import type { Product } from "../../types/product";

type AddProductModalProps = {
  onClose: () => void;
  onAddProduct: (product: Product) => void;
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !price || !quantity || !imageFile) {
      setError("Uzupelnij wszystkie wymagane pola.");
      return;
    }

    const priceValue = Number(price);
    const quantityValue = Number(quantity);

    if (priceValue <= 0 || quantityValue < 0) {
      setError("Cena musi byc wieksza od 0, a ilosc nie moze byc ujemna.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: name.trim(),
      subtitle: `// stock: ${quantityValue}`,
      price: priceValue,
      quantity: quantityValue,
      imageUrl: URL.createObjectURL(imageFile),
      visual: "uploaded",
    };

    onAddProduct(newProduct);
    clearForm();
    onClose();
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
      <div className="relative max-h-[90vh] w-[900px] max-w-full overflow-y-auto border-2 border-[#00ff2a]/40 bg-[#03080e]/95 p-12 shadow-[0_0_50px_rgba(0,255,42,0.12)] max-[700px]:px-5 max-[700px]:pb-6 max-[700px]:pt-9">
        <button
          className="absolute right-6 top-5 border-0 bg-transparent text-3xl text-[#7f8aa3] hover:text-[#00ff2a]"
          type="button"
          onClick={handleCancel}
          aria-label="Zamknij formularz"
        >
          x
        </button>

        <p className="text-3xl text-[#22ff88]">// Add new product</p>
        <h2 className="mt-2 text-lg text-[#7f8aa3]">Insert product data</h2>

        <form className="mt-9 flex flex-col gap-6" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2.5 font-bold text-[#f3f5f7]">
            <span>Product name</span>
            <input
              className="min-h-16 w-full border-2 border-[#00ff2a]/30 bg-white/10 px-5 py-4 text-[#f3f5f7] outline-none placeholder:text-[#f3f5f7]/45 focus:border-[#00ff2a]"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g., Hello World Tee"
            />
            <small className="font-normal text-[#7f8aa3]">// required field</small>
          </label>

          <label className="flex flex-col gap-2.5 font-bold text-[#f3f5f7]">
            <span>Price</span>
            <div className="flex items-center border-2 border-[#00ff2a]/30 bg-white/10 focus-within:border-[#00ff2a]">
              <input
                className="min-h-16 w-full border-0 bg-transparent px-5 py-4 text-[#f3f5f7] outline-none placeholder:text-[#f3f5f7]/45"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="99.99"
              />
              <strong className="pr-5 text-[#7f8aa3]">PLN</strong>
            </div>
            <small className="font-normal text-[#7f8aa3]">// required field</small>
          </label>

          <label className="flex flex-col gap-2.5 font-bold text-[#f3f5f7]">
            <span>Quantity</span>
            <input
              className="min-h-16 w-full border-2 border-[#00ff2a]/30 bg-white/10 px-5 py-4 text-[#f3f5f7] outline-none placeholder:text-[#f3f5f7]/45 focus:border-[#00ff2a]"
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="12"
            />
            <small className="font-normal text-[#7f8aa3]">// required field</small>
          </label>

          <label className="flex flex-col gap-2.5 font-bold text-[#f3f5f7]">
            <span>Image file</span>
            <input
              className="min-h-16 w-full cursor-pointer border-2 border-[#00ff2a]/30 bg-white/10 px-5 py-4 text-[#f3f5f7] outline-none focus:border-[#00ff2a]"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImageFile(event.target.files ? event.target.files[0] : null)
              }
            />
            <small className="font-normal text-[#7f8aa3]">
              {imageFile ? `// selected: ${imageFile.name}` : "// required field"}
            </small>
          </label>

          {error ? (
            <p className="border-l-[3px] border-[#00ff2a] bg-[#00ff2a]/10 px-4 py-3.5 text-[#f3f5f7]">
              {error}
            </p>
          ) : null}

          <div className="mt-3 flex gap-4 max-[700px]:flex-col">
            <button
              className="min-h-16 w-1/2 border-2 border-[#00ff2a] bg-transparent font-bold text-[#22ff88] hover:bg-[#00ff2a]/10 max-[700px]:w-full"
              type="submit"
            >
              Add product
            </button>
            <button
              className="min-h-16 w-1/2 border-2 border-[#32435f] bg-transparent font-bold text-[#7f8aa3] hover:border-[#7f8aa3] hover:text-[#f3f5f7] max-[700px]:w-full"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
