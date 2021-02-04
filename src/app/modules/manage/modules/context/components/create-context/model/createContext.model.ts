export class CreateContext {
    "contextCode": string = '';
    "contextGroup": {
        "version"?: number;
        "deleted"?: boolean;
        "organizationId"?: string;
        "groupId"?: string;
        "id"?: string;
        "name"?: string;
        "code"?: string;
        "language"?: string;
    };
    "contextLabels"?: {
        "name"?: string;
        "code"?: string;
        "language"?: string;
    }[];
    "entityDescriptions"?: {
        "name"?: string;
        "code"?: string;
        "language"?: string;
    }[];
    "contextValues": {
        "contextValueCode": string;
        "parentId": string;
        "contextValueLabels"?: {
            "name"?: string;
            "code"?: string;
            "language"?: string;
        }
    }[]
} 