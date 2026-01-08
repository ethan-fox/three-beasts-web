import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface IconSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  thumbIcon?: React.ReactNode;
  size?: "default" | "lg";
}

const IconSwitch = ({ className, thumbIcon, size = "default", ...props }: IconSwitchProps) => {
  const isLarge = size === "lg";

  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full",
        "border border-transparent shadow-xs transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        isLarge ? "h-8 w-14" : "h-6 w-11",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none flex items-center justify-center rounded-full",
          "bg-background shadow-lg ring-0 transition-transform",
          isLarge
            ? "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5"
            : "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
        )}
      >
        {thumbIcon}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
};

export { IconSwitch };
