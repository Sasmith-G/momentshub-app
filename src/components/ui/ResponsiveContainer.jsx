/**
 * Responsive Container Component
 * Handles mobile, tablet, and desktop layouts
 */
const ResponsiveContainer = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
