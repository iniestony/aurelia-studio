echo "########################################";
echo "Pre Production Packing script running...";
echo "########################################";
sed -i '' '/developmentLogging/d' src/main.js
echo "remove development logging done";
echo "########################################";
echo "Pre Production Packing script done!";
echo "########################################";
