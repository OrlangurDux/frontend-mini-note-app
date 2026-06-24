// src/components/Icon.jsx — tiny stroke-icon primitive + eye-toggle icon.
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', sw = 1.8, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {typeof d === 'string' ? <path d={d} /> : d}
    {children}
  </svg>
);

const EyeIcon = (open) => (
  <Icon d={open
    ? <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>
    : <><path d="M17.94 17.94A10.9 10.9 0 0 1 12 19c-6.5 0-10-7-10-7a18.6 18.6 0 0 1 4.22-5.19"/><path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>
  } />
);

Object.assign(window, { Icon, EyeIcon });
