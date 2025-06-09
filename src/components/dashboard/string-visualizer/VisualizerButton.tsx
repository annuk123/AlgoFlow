import Link from "next/link";
import { Button } from "@/components/ui/button";

type VisualizerButtonProps = {
  visualizerType: string;
};

export default function VisualizerButton({ visualizerType }: VisualizerButtonProps) {
  return (
    <Link href={`/string-visualizer?operation=${visualizerType}`}>
      <Button>Visualize {visualizerType}</Button>
    </Link>
  );
}
