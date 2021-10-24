import {Props} from "./types";

export const compileTemplate = (templatePugFn: (locals) => string, props: Props) => {
    let template = templatePugFn(props);
    console.log('compileToTemplate template', template);

    const {children = {}} = props;

    Object.keys(children).forEach(childTag => {
        console.log('childTag', childTag);
        template = template.replace(`<${childTag}></${childTag}>`, children[childTag].render());
        console.log('replacedTemplate', template);
    })

    return template;
};
