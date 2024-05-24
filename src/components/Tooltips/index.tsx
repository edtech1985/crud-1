import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const VerifiedTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "green",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "green",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const UnverifiedTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "red",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "red",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));


export const BustTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export const WhatsappTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "green",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "green",
    color: "white",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));