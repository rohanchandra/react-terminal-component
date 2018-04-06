import { OutputType } from 'javascript-terminal';
import TextOutput from 'output/TextOutput';
import TextErrorOutput from 'output/TextErrorOutput';
import HeaderOutput from 'output/HeaderOutput';

export default {
  [OutputType.TEXT_OUTPUT_TYPE]: TextOutput,
  [OutputType.TEXT_ERROR_OUTPUT_TYPE]: TextErrorOutput,
  [OutputType.HEADER_OUTPUT_TYPE]: HeaderOutput
};
