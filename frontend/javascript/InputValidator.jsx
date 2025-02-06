import React from "react";

export const validateUsername = (text) => /^[a-zA-Z0-9._]+$/.test(text);

export const validateLettersOnly = (text) => /^[a-zA-Z\s]+$/.test(text);