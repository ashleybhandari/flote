import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { Boat } from "@models/Boat";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { name: string; registrationId: string; participantNames: string[] }) => void;
  boat: Boat;
  existingParticipants: string[];
};

export default function EditModal({
  isOpen,
  onClose,
  onUpdate,
  boat,
  existingParticipants,
}: EditModalProps) {
  const [data, setData] = useState({
    registrationId: boat.registrationId || "",
    name: boat.name || "",
    participantNames: "",
  });

  const [participants, setParticipants] = useState<string[]>(boat.participantNames || []);
  const [participantError, setParticipantError] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setData({
        registrationId: boat.registrationId || "",
        name: boat.name || "",
        participantNames: "",
      });
      setParticipants(boat.participantNames || []);
      setParticipantError(null);
      setRegistrationError(null);
      setFormError(null);
    }
  }, [isOpen, boat]);

  const inputChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const addParticipant = () => {
    const newParticipant = data.participantNames.trim();
    if (!newParticipant) {
      setParticipantError("Participant name cannot be empty.");
      return;
    }
    if (participants.includes(newParticipant) || existingParticipants.includes(newParticipant)) {
      setParticipantError(`Participant name "${newParticipant}" is already used.`);
      return;
    }
    setParticipants((prev) => [...prev, newParticipant]);
    setData((prev) => ({ ...prev, participantNames: "" }));
    setParticipantError(null);
  };

  const deleteParticipant = (participant: string) => {
    setParticipants((prev) => prev.filter((p) => p !== participant));
  };

  const submit = () => {
    const { registrationId, name } = data;
    if (!registrationId.trim() || !name.trim() || participants.length === 0) {
      setFormError("All fields must be filled out, and at least one participant must be added.");
      return;
    }

    onUpdate({
      name,
      registrationId,
      participantNames: participants,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Boat</h2>
        <div className="flex flex-col gap-4">
          <Input
            label="Registration ID"
            placeholder="Enter Registration ID"
            value={data.registrationId}
            onChange={(e) => inputChange("registrationId", e.target.value)}
            isRequired
          />
          {registrationError && <p className="text-red-500 text-sm">{registrationError}</p>}
          <Input
            label="Name"
            placeholder="Enter Boat Name"
            value={data.name}
            onChange={(e) => inputChange("name", e.target.value)}
            isRequired
          />
          <Input
            label="Participant Name"
            placeholder="Enter Participant Name"
            value={data.participantNames}
            onChange={(e) => inputChange("participantNames", e.target.value)}
            isRequired
          />
          {participantError && <p className="text-red-500 text-sm">{participantError}</p>}
          <Button
            color="primary"
            onPress={addParticipant}
            disabled={!data.participantNames.trim()}
          >
            Add Participant
          </Button>
          <div className="mt-4">
            <strong>Participants:</strong>
            <ul className="list-disc pl-5">
              {participants.map((participant, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => deleteParticipant(participant)}
                >
                  {participant}
                </li>
              ))}
            </ul>
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button color="default" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={submit}>
            Update Boat
          </Button>
        </div>
      </div>
    </div>
  );
}
