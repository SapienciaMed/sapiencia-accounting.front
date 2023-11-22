import InventoryControlTechForm from "../forms/inventoryControlTechForm/InventoryControlTechForm";
import { useInventoryControlTech } from "../hooks/inventoryControlTech";

const InventoryControlTech = () => {
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
  } = useInventoryControlTech();
  return (
    <InventoryControlTechForm
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

export default InventoryControlTech;
