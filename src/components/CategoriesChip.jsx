function CategoriesChip({ category, isChosen, onClick }) {

    const { name } = category;
    return <h1 
    onClick={onClick}
    className= {`
      ${isChosen ? "bg-slate-300" : "bg-white"}
      p-3 border border-gray-800 hover:bg-slate-300`}>{name}</h1>;
  }
  
  export default CategoriesChip;
  