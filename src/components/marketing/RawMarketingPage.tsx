type RawMarketingPageProps = {
  styles: string;
  markup: string;
  className?: string;
};

export function RawMarketingPage({ styles, markup, className = "eccoozs-marketing-page" }: RawMarketingPageProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className={className} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
