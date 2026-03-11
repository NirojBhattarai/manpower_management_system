// utils/memo.ts
import React from 'react';

export const typedMemo: <T>(c: T) => T = React.memo;
