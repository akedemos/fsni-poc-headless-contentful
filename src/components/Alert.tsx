import { FC } from "react";

export type TAlert = {
  text: string;
  alertVariant: { variant: "Primary" | "Secondary" | "Tertiary" };
  enabled: boolean;
};

const bgVariants: Record<TAlert["alertVariant"]["variant"], string> = {
  Primary: "bg-[#d4edda]",
  Secondary: "bg-[#fff3cd]",
  Tertiary: "bg-[#f8d7da]",
};

const textVariants: Record<TAlert["alertVariant"]["variant"], string> = {
  Primary: "text-[#008a1f]",
  Secondary: "text-[#856404]",
  Tertiary: "text-[#ee0200]",
};

type Props = {
  data: TAlert | undefined;
};

const Alert: FC<Props> = ({ data }) => {
  if (!data || !data.enabled || !data.text) return null;

  return (
    <div
      className={`${bgVariants[data.alertVariant.variant]} ${
        textVariants[data.alertVariant.variant]
      } flex p-4`}
    >
      {data.text}
    </div>
  );
};

export default Alert;
