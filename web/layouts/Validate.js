import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "./shortcodes/all";
import YAMLEditor from "@layouts/components/YAMLEditor";
import LogHighlighter from "@layouts/components/LogHighlighter";
import { useAPIResponse } from 'context/apiresp';

const Validate = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;
  const { contact_form_action } = config.params;

  //const apiContext = useAPIResponse();
  //apiContext.setAPIResponse("SOME TEXT PROFILE VALUE")

  return (
    <section className="section pt-[22px]">
      <div className="container">
        <div className="row">
          <div className="mx-auto lg:col-12">
            <div className="row mb-5">
              {markdownify(title, "h3", "h5 font-normal text-3xl")}
              <div className="md:col-6 pt-6">
                <span>Paste your Kubernetes YAML manifest file here</span>
                <div className="pt-2">
                  <YAMLEditor />
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-6 pt-6">
                <span>Validation result will appear here</span>
                <LogHighlighter logText={"ERROR - Hello World"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Validate;
