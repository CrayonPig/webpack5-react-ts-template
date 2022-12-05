import { MetaProps } from '../interface';

const BaseAuthRouter = (props: { element: JSX.Element, meta: MetaProps }): any => {
  console.log('BaseAuthRouter', props);
  const authKey = props.meta.key || '';


  return props.element;
};
  
export default BaseAuthRouter;
