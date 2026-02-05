import * as React from "react";
import { Rating, Stack, Text, Title } from "@mantine/core";
import { AuthContext } from "../../contextx/AuthContext";
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";

const getIconStyle = (color) => ({
    width: 20, height: 20, color: color ? `var(--mantine-color-${color}-7)` : undefined, 
});

const getEmptyIcon = (value) => {
    const iconStyle = getIconStyle();

    switch (value) {
        case 1:
            return <IconMoodCry style={iconStyle} />

        case 2:
            return <IconMoodSad style={iconStyle} />
        
        case 3:
            return <IconMoodSmile style={iconStyle} />

        case 4:
            return <IconMoodHappy style={iconStyle} />

        case 5:
            return <IconMoodCrazyHappy style={iconStyle} />
    
        default:
            return null;
    }
}

const getFullIcon = (value) => {
     switch (value) {
        case 1:
            return <IconMoodCry style={getIconStyle('red')} />

        case 2:
            return <IconMoodSad style={getIconStyle('orange')} />
        
        case 3:
            return <IconMoodSmile style={getIconStyle('yellow')} />

        case 4:
            return <IconMoodHappy style={getIconStyle('lime')} />

        case 5:
            return <IconMoodCrazyHappy style={getIconStyle('green')} />
    
        default:
            return null;
    }
}

export default function DashboardProfileCardFeedbackRating() {
  const { user } = React.useContext(AuthContext);
  return (
    <Stack gap={1}>
      <Title order={5}>Feedback</Title>
      <Rating value={2.3} readOnly emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />
      <Text>
        <Text fw={700} span>
          2.3
        </Text>
        - dummy rating
      </Text>
    </Stack>
  );
}
