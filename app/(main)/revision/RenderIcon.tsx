import React, { Suspense } from "react";
import { LucideIcon } from "lucide-react";

export const renderIcon = (iconName: string) => {
  const IconComponent = React.lazy(() =>
    import("lucide-react").then((module) => {
      const Component = module[iconName] as LucideIcon | undefined;
      if (!Component) {
        throw new Error(
          `O ícone "${iconName}" não existe na biblioteca lucide-react.`
        );
      }
      return { default: Component };
    })
  );

  return (
    <Suspense fallback={<div>...</div>}>
      <IconComponent
        className="text-secondary/45 hover:text-secondary400 transition-opacity duration-300"
        size={"17rem"}
      />
    </Suspense>
  );
};
