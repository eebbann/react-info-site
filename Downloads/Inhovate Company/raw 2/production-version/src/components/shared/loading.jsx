import { css } from "@emotion/react";
import ClipLoader from "react-spinners/HashLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

function Loading() {
  return (
    <div className="sweet-loadin">
      <ClipLoader loading={true} css={override} size={50} color="#64abd6" />
    </div>
  );
}

export default Loading;
