import React, { useEffect, useState } from "react";
import Modal from "../../core/components/modal/Modal";
import { SearchFormValues } from "../../util/typeUtil";
import SearchForm from "./components/SearchForm";

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams: SearchFormValues;
  onApply: (params: SearchFormValues) => void;
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  initialParams,
  onApply,
}) => {
  const [formValues, setFormValues] = useState(initialParams);

  useEffect(() => {
    setFormValues(initialParams);
  }, [initialParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SearchForm
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default AdvancedSearchModal;
