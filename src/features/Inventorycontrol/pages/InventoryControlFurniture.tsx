import InventoryControlFurnitureForm from "../forms/inventoryControlFurnitureForm/InventoryControlFurnitureForm";
import { useInventoryControlFurniture } from "../hooks/inventoryControlFurniture";

const InventoryControlFurniture = () => {
  const {
    errors,
    isValid,
    onSubmit,
    register,
    tableView,
    handleChange,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    searchResults,
    handleClose,
    handleSave,
    downloadCollection,
    setShowFooterActions,
    showFooterActions,
  } = useInventoryControlFurniture();
  return (
    <InventoryControlFurnitureForm
      showFooterActions={showFooterActions}
      setShowFooterActions={setShowFooterActions}
      errors={errors}
      handleSave={handleSave}
      handleClose={handleClose}
      isValid={isValid}
      onSubmit={onSubmit}
      register={register}
      tableView={tableView}
      handleChange={handleChange}
      submitDisabled={submitDisabled}
      setPaginateData={setPaginateData}
      tableComponentRef={tableComponentRef}
      downloadCollection={downloadCollection}
      searchResults={searchResults}
    />
  );
};

export default InventoryControlFurniture;
