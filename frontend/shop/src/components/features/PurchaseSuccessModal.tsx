type PurchaseSuccessModalProps = {
  onClose: () => void;
};

const PurchaseSuccessModal = ({ onClose }: PurchaseSuccessModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-5"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex min-h-32 w-[420px] max-w-full items-center gap-5 border-2 border-accent bg-[#03080e] px-8 py-7 shadow-[0_0_50px_rgba(0,255,42,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="text-accent grid h-12 w-12 shrink-0 place-items-center border-2 border-accent text-3xl font-bold">
          ✓
        </span>
        <div>
          <p className="text-main text-2xl font-bold">Zakup dokonany</p>
          <p className="text-muted mt-2 text-sm">// powrót do sklepu</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
