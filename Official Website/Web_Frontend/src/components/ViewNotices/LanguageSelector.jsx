const LanguageSelector = ({ language, setLanguage, loading }) => {
    return (
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-4 py-2 border rounded-md"
        disabled={loading}
      >
        <option value="en">English</option>
        <option value="si">සිංහල</option>
        <option value="ta">தமிழ்</option>
      </select>
    );
  };
  
  export default LanguageSelector;