import CountUp from "react-countup";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
}: AnimatedNumberProps) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1.5}
      decimals={decimals}
      separator=","
      prefix={prefix}
      suffix={suffix}
    />
  );
}