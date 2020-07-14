import React, { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Vis = (props: { hvis: any; children: React.ReactNode }) : React.ReactElement | null => (
  props.hvis === undefined || props.hvis === null || props.hvis === false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (null as any)
    : props.children
);

export default Vis;
