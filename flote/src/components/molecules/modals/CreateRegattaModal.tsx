import { useState, useEffect } from "react";

import GenericModal from "@atoms/GenericModal";
import { Input } from "@nextui-org/input";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { regattaName: string }) => void;
};

export default function CreateRegattaModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [data, setData] = useState({ regattaName: "" });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setData({ regattaName: "" });
      setFormError(null);
    }
  }, [isOpen]);

  const inputChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = () => {
    const { regattaName } = data;
    if (!regattaName.trim()) {
      setFormError("Regatta name cannot be empty.");
      return;
    }
    onSubmit({ regattaName });
    setData({ regattaName: "" });
    setFormError(null);
  };

  if (!isOpen) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      title="Create a new regatta"
      closeText="Cancel"
      submitText="Create"
      onClose={() => onClose(data)}
      onSubmit={handleFormSubmit}
    >
      <Input
        label="Regatta Name"
        placeholder="Enter Regatta Name"
        value={data.regattaName}
        onChange={(e) => inputChange("regattaName", e.target.value)}
        isRequired
      />
      {formError && <p className="text-red-500 text-sm">{formError}</p>}
    </GenericModal>
  );
}
