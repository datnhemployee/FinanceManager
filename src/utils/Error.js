import { Alert } from "react-native";

export default {
    Type: {
        notNull: ({name = 'unknown'} = {}) => `The ${name} is null.`,
    }
}