import React from "react";

function DynamicPage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      DynamicPage: {params.profileId}
    </div>
  );
}

export default DynamicPage;
