import InventoryControlTechForm from "../forms/inventoryControlTechForm/InventoryControlTechForm";
import { useInventoryControlTech } from "../hooks/inventoryControlTech";

const InventoryControlTech = () => {
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
