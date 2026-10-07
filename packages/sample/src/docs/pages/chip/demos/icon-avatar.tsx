import { Avatar, Chip } from "@minerva/lib-core";
import { FaCode, FaMapMarkerAlt } from "react-icons/fa";

export default function IconAvatarDemo() {
  return (
    <>
      <Chip label="Frontend" icon={<FaCode />} color="info" variant="soft" />
      <Chip label="Paris" icon={<FaMapMarkerAlt />} variant="outlined" />
      <Chip
        label="Mia Rossi"
        avatar={<Avatar name="Mia Rossi" size="small" />}
      />
    </>
  );
}
