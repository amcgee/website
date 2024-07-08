/* eslint-disable react/prop-types */
import MobileNav from 'components/pages/doc/mobile-nav';
import Sidebar from 'components/pages/doc/sidebar';
import Container from 'components/shared/container';
import Layout from 'components/shared/layout';
import { DOCS_BASE_PATH } from 'constants/docs';
import { getSidebar } from 'utils/api-docs';

const NeonDocsLayout = async ({ children }) => {
  const sidebar = await getSidebar();

  return (
    <Layout burgerWithoutBorder isDocPage isHeaderSticky headerWithBorder>
      <div className="safe-paddings flex flex-1 dark:bg-black-pure dark:text-white lg:block">
        <MobileNav className="hidden lg:block" sidebar={sidebar} basePath={DOCS_BASE_PATH} />

        <Sidebar
          sidebar={sidebar}
          basePath={DOCS_BASE_PATH}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
          className="-mt-[69px] w-[350px] shrink-0 xl:w-[302px] lg:hidden"
        />

        <div className="-ml-[350px] w-full 3xl:ml-0">
          <Container
            className="grid w-full flex-1 grid-cols-12 gap-x-8 pb-20 pt-9 2xl:block xl:gap-x-7"
            size="1408"
          >
            {children}
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default NeonDocsLayout;
