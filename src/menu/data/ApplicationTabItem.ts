import * as React from "react";

export interface ApplicationWindowItem<STATE> {
    state: STATE;
    tab: React.ReactElement<{
        onClick?: (...args: any[]) => any
    }>;
    content: React.ReactNode;
}