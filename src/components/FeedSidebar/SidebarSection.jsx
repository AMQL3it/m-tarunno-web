import TitleLine from "../General/TitleLine";

const SidebarSection = ({ title, children }) => (
  <section className="mb-6 last:mb-0 ">
    <TitleLine title={title} />
    <div className="mt-3">{children}</div>
  </section>
);

export default SidebarSection;
