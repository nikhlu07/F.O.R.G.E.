export const Footer = () => {
  return (
    <footer className="bg-black text-gray-500">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-white tracking-wide">Acknowledgments</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Hedera Hashgraph</li>
              <li>OpenZeppelin</li>
              <li>The African Development Community</li>
              <li>All contributors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wide">Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Demo</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wide">License</h4>
            <p className="mt-4 text-sm">This project is licensed under the MIT License.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>Built with ⚡ by rebels who believe code is law, and law should serve the people.</p>
        </div>
      </div>
    </footer>
  );
};
