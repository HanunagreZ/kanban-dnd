interface PlusIconProps {
  fill: string;
  width: number;
  height: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ fill, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2276 0.700012C5.74435 0.700012 5.3526 1.09176 5.3526 1.57501V5.85527H1.07501C0.591763 5.85527 0.200012 6.24703 0.200012 6.73027V7.27118C0.200012 7.75443 0.591764 8.14618 1.07501 8.14618H5.3526V12.425C5.3526 12.9083 5.74435 13.3 6.2276 13.3H6.76851C7.25176 13.3 7.64351 12.9083 7.64351 12.425V8.14618H11.925C12.4083 8.14618 12.8 7.75443 12.8 7.27118V6.73027C12.8 6.24703 12.4083 5.85527 11.925 5.85527H7.64351V1.57501C7.64351 1.09176 7.25176 0.700012 6.76851 0.700012H6.2276Z"
        fill={fill}
      />
    </svg>
  );
};

export default PlusIcon;
