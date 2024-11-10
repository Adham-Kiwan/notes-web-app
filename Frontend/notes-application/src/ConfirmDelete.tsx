function ConfirmDelete({ isVisible, onConfirm, onCancel, noteTitle }: any) {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md">
          <h3 className="text-lg font-bold">Are you sure you want to delete the note: "{noteTitle}"?</h3>
          <div className="mt-4 flex justify-between">
            <button className="bg-[#ff3737] text-white p-2 rounded-md" onClick={onConfirm}>
              Yes, Confirm
            </button>
            <button className="bg-[#2563eb] text-white p-2 rounded-md" onClick={onCancel}>
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmDelete;
  