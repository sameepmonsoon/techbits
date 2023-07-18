import { forwardRef } from "react";
const InputComponent = forwardRef(function InputComponent(props, ref) {
  return (
    <div>
      <input type="text" {...props} ref={ref} />
    </div>
  );
});

export default InputComponent;
