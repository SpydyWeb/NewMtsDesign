import { jsx as _jsx } from "react/jsx-runtime";
import { View, Image, useTheme, Text, Heading, Button, useAuthenticator } from "@aws-amplify/ui-react";
export const components = {
    Header() {
        const { tokens } = useTheme();
        return (_jsx(View, { textAlign: "center", padding: tokens.space.large, children: _jsx(Image, { alt: "Amplify logo", src: "https://www.mtsgrp.net/img/logo/logoorgv2.png" }) }));
    },
    Footer() {
        const { tokens } = useTheme();
        return (_jsx(View, { textAlign: "center", padding: tokens.space.large, children: _jsx(Text, { color: tokens.colors.neutral[80], children: "\u00A9 All Rights Reserved" }) }));
    },
    SignIn: {
        Header() {
            const { tokens } = useTheme();
            return (_jsx(Heading, { padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`, level: 3, children: "Sign in to your account" }));
        },
        Footer() {
            const { toResetPassword } = useAuthenticator();
            return (_jsx(View, { textAlign: "center", children: _jsx(Button, { fontWeight: "normal", onClick: toResetPassword, size: "small", variation: "link", children: "Reset Password" }) }));
        },
    },
    ResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (_jsx(Heading, { padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`, level: 3, children: "Enter Information:" }));
        },
    },
    ConfirmResetPassword: {
        Header() {
            const { tokens } = useTheme();
            return (_jsx(Heading, { padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`, level: 3, children: "Enter Information:" }));
        },
    },
};
export const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
        },
    },
    forceNewPassword: {
        password: {
            placeholder: 'Enter your Password:',
        },
    },
    resetPassword: {
        username: {
            placeholder: 'Enter your email:',
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Enter your Confirmation Code:',
            label: 'New Label',
            isRequired: false,
        },
        confirm_password: {
            placeholder: 'Enter your Password Please:',
        },
    },
    setupTOTP: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your Confirmation Code:',
            isRequired: false,
        },
    },
};
