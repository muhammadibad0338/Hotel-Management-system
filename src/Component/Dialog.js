import React from "react";
import { Dialog, Slide } from "@material-ui/core";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScreenDialog(props) {
    const { children, hideDialogHandler, maxWidth, fullWidth, scrollType,openDialog } = props;

    return (
        <Dialog
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            open={openDialog}
            scroll={scrollType ? scrollType : "paper"}
            onClose={hideDialogHandler}
            TransitionComponent={Transition}
        >
            {children}
        </Dialog>
    );
}