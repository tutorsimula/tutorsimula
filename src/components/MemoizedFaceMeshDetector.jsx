import React, { memo } from "react";
import FaceMeshDetector from "./FaceMeshDetector";

const MemoizedFaceMeshDetector = memo(FaceMeshDetector);

export default MemoizedFaceMeshDetector;
