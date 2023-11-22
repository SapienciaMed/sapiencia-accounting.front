import InventoryControlFurnitureForm from "../forms/inventoryControlFurnitureForm/InventoryControlFurnitureForm";
import { useInventoryControlFurniture } from "../hooks/inventoryControlFurniture";

const InventoryControlFurniture = () => {
  const {
    errors,
    isValid,
    onSubmit,
    register,
    tableView,
    handleClean,
    handleChange,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    searchResults,
    handleClose,
    handleSave,
    downloadCollection,
  } = useInventoryControlFurniture();
  return (
    <InventoryControlFurnitureForm
      errors={errors}
      handleSave={handleSave}
      handleClose={handleClose}
      isValid={isValid}
      onSubmit={onSubmit}
      register={register}
      tableView={tableView}
      handleClean={handleClean}
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
