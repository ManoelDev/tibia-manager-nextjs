import { Button } from "../ui/button";
import { IconiFy } from '../Iconify'

type Props = {
  onDownload?: VoidFunction;
};

export default function DownloadButton({ onDownload }: Props) {
  return (
    <Button
      onClick={onDownload}
      className="p-0 m-0 h-auto rounded-full opacity-75 mr-1"
    >
      <IconiFy icon="eva:arrow-circle-down-fill" width={24} />
    </Button>
  );
}
