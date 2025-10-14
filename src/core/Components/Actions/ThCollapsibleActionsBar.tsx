"use client";

import React, { Fragment } from "react";

import { ThActionEntry, ThActionsBar, ThActionsBarProps, ThActionsTriggerVariant } from "./ThActionsBar";
import { ThMenu, THMenuProps } from "../Menu/ThMenu";

import { useObjectRef } from "react-aria";
import { CollapsiblePref, useCollapsibility } from "./hooks/useCollapsibility";
import { StatefulControlledReadAloudExperiment } from "@/vendor/kbnlresearch/components/StatefulControlledReadAloudExperiment";

export interface ThCollapsibleActionsBarProps extends ThActionsBarProps {
  id: string;
  items: ThActionEntry<string>[];
  prefs: CollapsiblePref;
  breakpoint?: string;
  children?: never;
  compounds?: {
    menu: THMenuProps<string> | React.ReactElement<typeof ThMenu>;
  }
}

export const ThCollapsibleActionsBar = ({
  ref,
  id,
  items,
  prefs,
  breakpoint,
  compounds,
  ...props
}: ThCollapsibleActionsBarProps) => {
  const resolvedRef = useObjectRef(ref);
  const Actions = useCollapsibility(items, prefs, breakpoint);

  return (
    <>
    <ThActionsBar 
      ref={ resolvedRef }
      { ...props }
    >
      { /* KB Vendor hacking in for now  */}
      <StatefulControlledReadAloudExperiment />
      { /* end KB hack */}
      { Actions.ActionIcons.map(({ Trigger, Target, key, associatedKey }) => 
          <Fragment key={ key }>
            <Trigger 
              key={ `${ key }-trigger` } 
              variant={ ThActionsTriggerVariant.button }
              { ...(associatedKey ? { associatedKey: associatedKey } : {}) } 
              { ...props }
            />
            { Target && <Target key={ `${ key }-container` } triggerRef={ resolvedRef } /> }
          </Fragment>
        ) 
      }

      { React.isValidElement(compounds?.menu) 
        ? (React.cloneElement(compounds.menu, {
          ...compounds.menu.props,
          id: id,
          triggerRef: resolvedRef,
          items: Actions.MenuItems,
          dependencies: ["Trigger"],
        } as THMenuProps<string>)) 
        : (<ThMenu 
          id={ id } 
          triggerRef={ resolvedRef }
          items={ Actions.MenuItems }
          dependencies={ ["Trigger"] }
          { ...compounds?.menu }
        />
      )}
    </ThActionsBar>
    </>
  )
}
