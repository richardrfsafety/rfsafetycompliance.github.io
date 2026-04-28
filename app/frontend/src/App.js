"import \"@/App.css\";

/**
 * Live preview of /site-search.html — the deliverable.
 * The actual standalone file is in /public/site-search.html.
 * This wrapper lets you preview it (and copy the URL for an iframe test
 * inside Google Sites) while developing on Emergent.
 */
function App() {
  const downloadUrl = `${process.env.PUBLIC_URL || \"\"}/site-search.html`;
  const readmeUrl = `${process.env.PUBLIC_URL || \"\"}/README-SETUP.md`;

  return (
    <div className=\"rf-shell\" data-testid=\"rf-shell\">
      <div className=\"rf-toolbar\" data-testid=\"rf-toolbar\">
        <div className=\"rf-toolbar-left\">
          <span className=\"rf-badge\">PREVIEW</span>
          <span className=\"rf-toolbar-title\">
            RF Safety Compliance &middot; Site Search (single-file deliverable)
          </span>
        </div>
        <div className=\"rf-toolbar-right\">
          <a
            className=\"rf-link\"
            href={readmeUrl}
            target=\"_blank\"
            rel=\"noopener noreferrer\"
            data-testid=\"readme-link\"
          >
            Setup Guide
          </a>
          <a
            className=\"rf-link rf-link-primary\"
            href={downloadUrl}
            target=\"_blank\"
            rel=\"noopener noreferrer\"
            data-testid=\"open-standalone-link\"
          >
            Open standalone ↗
          </a>
        </div>
      </div>
      <iframe
        title=\"RF Safety Site Search\"
        src={downloadUrl}
        className=\"rf-frame\"
        data-testid=\"rf-frame\"
      />
    </div>
  );
}

export default App;
"
