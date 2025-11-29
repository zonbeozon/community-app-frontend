export const wrapper = 'flex';

export const previewWrapper = 'flex p-2 border rounded-md bg-slate-50 mr-4';

export const previewPlaceholder = 'flex justify-center items-center text-slate-400';

export const previewPlaceholderIcon = 'w-12 h-12';

export const previewItem = 'relative w-24 h-24 border rounded-md overflow-hidden shadow-sm';

export const previewImage = 'w-full h-full object-cover';

export const removeButton =
'absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-0.5 hover:bg-black transition-colors disabled:cursor-not-allowed';

export const removeIconSize = 16;

export const uploadControlsContainer = 'flex items-center gap-4';

export const uploadLabel = (isDisabled: boolean) =>
  `inline-block px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
    isDisabled ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-white cursor-pointer hover:bg-slate-100'
  }`;

export const uploadLimitError = 'text-sm text-red-600';

export const uploadCountText = 'text-sm text-slate-600';

export const uploadErrorText = 'text-sm text-red-600 font-medium';
