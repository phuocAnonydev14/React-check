const SkeletonElement = ({ type }) => {
  const skeleton = `skeleton ${type}`;

  return (
    <div className={skeleton}>
      <p>Loading.............</p>
    </div>
  );
};

export default SkeletonElement;
