import { Flex, Heading, Popover, Button, Badge } from "native-base";

export default function Alert(props) {
  const alertType = props.alertType;
  const infoIcon = props.infoIcon;
  const tooltipText = props.tooltipText;
  const badgeText = props.badgeText
  return (
    <Flex direction="row" alignItems={"center"} mb={2} ml={4}>
      <Heading size="md">{alertType}</Heading>
      <Popover
        trigger={(triggerProps) => {
          return (
            <Button {...triggerProps} variant="unstyled">
              {infoIcon}
            </Button>
          );
        }}
      >
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Body>{tooltipText}</Popover.Body>
        </Popover.Content>
      </Popover>
      {props.unreadAlert ? (
      <Badge bg={"red.50"} alignSelf="center" variant="solid" borderRadius="md">
        {badgeText}
      </Badge>
      ) : null}
    </Flex>
  );
}
