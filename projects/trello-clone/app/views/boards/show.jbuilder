json.(@board, :id, :title)

unless @lists.nil?
  json.lists(@lists) do |list|
    json.(list, :id, :title, :rank, :board_id, :cards)
  end
end