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
        className="flex min-h-32 w-[420px] max-w-full items-center gap-5 border-2 border-[#00ff2a] bg-[#03080e] px-8 py-7 shadow-[0_0_50px_rgba(0,255,42,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#00ff2a] text-3xl font-bold text-[#00ff2a]">
          ✓
        </span>
        <div>
          <p className="text-2xl font-bold text-[#f3f5f7]">Zakup dokonany</p>
          <p className="mt-2 text-sm text-[#7f8aa3]">// powrót do sklepu</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
